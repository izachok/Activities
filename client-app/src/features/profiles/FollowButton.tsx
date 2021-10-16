import { Button } from "react-bootstrap";
import { Profile } from "../../app/models/profile";
import { SyntheticEvent } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, isLoading } = profileStore;

  if (userStore.user?.username === profile.username) return null;

  function handleFollow(e: SyntheticEvent, username: string) {
    e.preventDefault();
    profile.isFollowing
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  }

  return (
    <Button
      className="w-100 mt-2"
      variant={profile.isFollowing ? "danger" : "success"}
      disabled={isLoading}
      onClick={(e) => handleFollow(e, profile.username)}
    >
      {profile.isFollowing
        ? isLoading
          ? "Unfollowing..."
          : "Unfollow"
        : isLoading
        ? "Following..."
        : "Follow"}
    </Button>
  );
});
